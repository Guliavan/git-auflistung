import { Component, Element, h, State } from '@stencil/core';

import { QUERY_PARAMS, GITHUB_REPOS_BASE_URL } from '../../global/constants';

const DEFAULT_CONTRIBUTORS_COUNT = 30;

/**
 * The Git auflistung main page. Displays the repository search form as well as results : repository detail and contributors list
 */
@Component({
    tag: 'app-listing',
    styleUrl: 'app-listing.css',
    shadow: true,
})
export class AppHome {

    @Element() element;

    @State() noResultFound = false;
    @State() currentRepositoryInfo: any = null;
    @State() currentRepositoryContributorList: Array<any> = null;

    private isLoadingResults = false;

    async launchRepositorySearch() {
        const owner = this.element.shadowRoot.querySelector('#searchOwnerName').value;
        const repository = this.element.shadowRoot.querySelector('#searchRepository').value;
        const contributorsCount = this.element.shadowRoot.querySelector('#searchContributorsCount').value;

        this.isLoadingResults = true;

        // Get repository info
        const repoResponse = await fetch(`${GITHUB_REPOS_BASE_URL}/${owner}/${repository}`, QUERY_PARAMS);

        if (repoResponse.status == 200) {
            const repositoryJson = await repoResponse.json();

            // Get contributors info
            let contributorsURL = repositoryJson.contributors_url || `${GITHUB_REPOS_BASE_URL}/${owner}/${repository}/contributors`
            contributorsURL += `?q=contributions&order=asc&per_page=${contributorsCount}`;
            const contributorsResponse = await fetch(contributorsURL, QUERY_PARAMS);

            let contributorsJson = [];
            if (contributorsResponse.status == 200) {
                contributorsJson = await contributorsResponse.json();
            }

            this.currentRepositoryInfo = repositoryJson;
            this.currentRepositoryContributorList = contributorsJson;
            this.noResultFound = false;
            this.isLoadingResults = false;
        } else {
            this.currentRepositoryInfo = null;
            this.currentRepositoryContributorList = null;
            this.noResultFound = true;
            this.isLoadingResults = false;
        }

        return false;
    }

    checkContributorsCount() {
        let contributorsCount = this.element.shadowRoot.querySelector('#searchContributorsCount').value;
        contributorsCount = contributorsCount < 1 ? 1 : contributorsCount > 200 ? 200 : contributorsCount;
        this.element.shadowRoot.querySelector('#searchContributorsCount').value = contributorsCount;
    }

    checkSubmitOnEnter(event: Event) {
        if (event['charCode'] == 13) {
            this.launchRepositorySearch()
        }
    }

    render() {
        return (
            <div class="app-listing">
                <aside class="repository-search">
                    Please select owner and repository to look for:
                    <form class="repository-search__form">
                        <section class="repository-search__fields">
                            <label htmlFor="searchOwnerName">Owner's name</label>
                            <input
                                tabIndex={ 1 }
                                type="text"
                                id="searchOwnerName"
                                placeholder="Owner's name"
                                title="Owner's name"
                                value=""
                                onKeyPress={event => this.checkSubmitOnEnter(event) }/>
                            <label htmlFor="searchRepository">Repository name</label>
                            <input
                                tabIndex={ 2 }
                                type="text"
                                id="searchRepository"
                                placeholder="Repository name"
                                title="Repository name"
                                value=""
                                onKeyPress={event => this.checkSubmitOnEnter(event) }/>
                            <label htmlFor="searchContributorsCount">Max Contributors Count</label>
                            <input
                                tabIndex={ 2 }
                                type="number"
                                id="searchContributorsCount"
                                placeholder="Contributors Count"
                                title="Contributors Count"
                                min='1'
                                max='200'
                                value={DEFAULT_CONTRIBUTORS_COUNT}
                                onBlur={_event => this.checkContributorsCount()}
                                onKeyPress={event => { this.checkContributorsCount(); this.checkSubmitOnEnter(event); } }/>
                        </section>
                        <button
                            tabIndex={ 4 }
                            type="button"
                            title="Click to submit your search"
                            id="searchButton"
                            onClick={_event => this.launchRepositorySearch()}>Search</button>
                    </form>
                </aside>

                <article class="repository-detail" aria-live="polite">
                    {
                        !this.isLoadingResults && this.currentRepositoryInfo ?
                            <section>
                                <repository-detail repoInfo={this.currentRepositoryInfo}></repository-detail>
                                <repository-contributor-list contributorList={this.currentRepositoryContributorList}></repository-contributor-list>
                            </section>
                            : this.isLoadingResults ? 'Loading results...'
                                : this.noResultFound ? 'No information found for given repository / owner :(' : ''
                    }
                </article>

            </div>
        );
    }
}
