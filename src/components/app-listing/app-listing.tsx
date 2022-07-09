import { Component, Element, h, State } from '@stencil/core';

const QUERY_PARAMS = { headers: { authorization: "token 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" } };
const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_REPOS_BASE_URL = `${GITHUB_BASE_URL}/repos`;
const DEFAULT_CONTRIBUTORS_COUNT = 30;

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

    async launchRepositorySearch() {
        const owner = this.element.shadowRoot.querySelector('#searchOwnerName').value;
        const repository = this.element.shadowRoot.querySelector('#searchRepository').value;
        const contributorsCount = this.element.shadowRoot.querySelector('#searchContributorsCount').value;

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
            this.noResultFound = false
        } else {
            this.currentRepositoryInfo = null;
            this.currentRepositoryContributorList = null;
            this.noResultFound = true;
        }
    }


    checkContributorsCount() {
        let contributorsCount = this.element.shadowRoot.querySelector('#searchContributorsCount').value;
        contributorsCount = contributorsCount < 1 ? 1 : contributorsCount > 200 ? 200 : contributorsCount;
        this.element.shadowRoot.querySelector('#searchContributorsCount').value = contributorsCount;
    }


    render() {

        return (
            <div class="app-listing">

                Please select owner and repository to look for:
                <section>
                    <input
                        type="text"
                        id="searchOwnerName"
                        placeholder="Owner's name"
                        value="nodejs" />
                    <input
                        type="text"
                        id="searchRepository"
                        placeholder="Repository name"
                        value="node" />
                    <input
                        type="number"
                        id="searchContributorsCount"
                        placeholder="Contributors Count"
                        value={DEFAULT_CONTRIBUTORS_COUNT}
                        min='1'
                        max='200'
                        onBlur={_event => this.checkContributorsCount()} />
                    <button onClick={_event => this.launchRepositorySearch()}>Search</button>
                </section>

                {
                    this.currentRepositoryInfo ?
                        <article class="repository-detail">
                            <repository-detail repoInfo={this.currentRepositoryInfo}></repository-detail>
                            <hr />
                            <repository-contributor-list contributorList={this.currentRepositoryContributorList}></repository-contributor-list>
                        </article>
                        : this.noResultFound ? 'No information found for given repository / owner :(' : ''
                }

            </div>
        );
    }
}
