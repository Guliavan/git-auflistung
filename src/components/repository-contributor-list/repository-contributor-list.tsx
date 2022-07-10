import { Prop, State, Watch, Component, Host, h } from '@stencil/core';

import { QUERY_PARAMS } from '../../global/constants';

const EMPTY_AVATAR_URL = 'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png';

/**
 * Repository Contributors List component. Takes contributors array as parameter and displays information.
 * Each contributors information will be augmented to display more detail. Calls are made to Github API for each contributors using their API url.
 */
@Component({
    tag: 'repository-contributor-list',
    styleUrl: 'repository-contributor-list.css',
    shadow: true,
})
export class RepositoryContributorList {

    /**
     * An array of contributors JSON with format returned by Github API. Displaying keys that are considered for this component:
     * [
            {
                avatar_url: 'http://some-image-url.tld',
                login: 'loginname1',
                contributions: 10,
                url: 'http://somecontriburl.tld'
            },
            {
                avatar_url: 'http://some-image-url-2.tld',
                login: 'loginname2',
                contributions: 12,
                url: 'http://somecontriburl2.tld'
            }
     *  ]
     */
    @Prop() contributorList: Array<any> = null;

    @State() fullContributorInfoList = new Array<any>();

    @Watch('contributorList')
    watchHandler(_newValue: string): void {
        this.updateFullContributorList();
    }

    private isLoadingContributors = false;

    async getFullContributorInfo(contributor: any) {
        const result = {
            avatar_url: contributor.avatar_url ? contributor.avatar_url : EMPTY_AVATAR_URL,
            login: contributor.login ? contributor.login : '',
            contributions: contributor.contributions ? contributor.contributions : '',
            name: '',
            company: '',
            location: ''
        }

        // Get repository info
        const contribResponse = await fetch(contributor.url, QUERY_PARAMS);

        if (contribResponse.status == 200) {
            const contribJson = await contribResponse.json();
            result.name = contribJson.name ? contribJson.name : '';
            result.company = contribJson.company ? contribJson.company : '';
            result.location = contribJson.location ? contribJson.location : '';
        }
        return result;
    }

    updateFullContributorList() {
        if (this.contributorList) {
            // Get complete contributor information and update state variable to trigger re-render
            this.isLoadingContributors = true;
            const temporaryList = new Array<any>();
            this.contributorList.map((contributor, index) => {
                this.getFullContributorInfo(contributor).then(
                    fullContributorInfo => {
                        temporaryList.push(fullContributorInfo);
                        if (index == this.contributorList.length - 1) {
                            this.fullContributorInfoList = temporaryList;
                            this.isLoadingContributors = false;
                        }
                    }
                )
            });
        }
    }

    componentDidLoad() {
        this.updateFullContributorList();
    }

    render() {

        return (
            <Host>
                {this.fullContributorInfoList && this.fullContributorInfoList.length > 0 ?
                    this.isLoadingContributors ?
                        <article class="contributor__info">Loading contributors information, please wait...</article>
                        :   <article>
                                <header><h2>Repository Contributors ({this.fullContributorInfoList.length})</h2></header>
                                <table class="contributor__list">
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Login</th>
                                        <th>Contributions</th>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Location</th>
                                    </tr>
                                    {this.fullContributorInfoList.map(
                                        fullContributorInfo =>
                                            <tr>
                                                <td><img alt={`Avatar image for ${fullContributorInfo.login}`} src={fullContributorInfo.avatar_url} class="contributor__avatar" /></td>
                                                <td>{fullContributorInfo.login}</td>
                                                <td>{fullContributorInfo.contributions}</td>
                                                <td>{fullContributorInfo.name}</td>
                                                <td>{fullContributorInfo.company}</td>
                                                <td>{fullContributorInfo.location}</td>
                                            </tr>
                                    )}
                                </table>
                            </article>
                    : <article class="contributor__info">No contributors to display :( !</article>}
            </Host>
        );
    }

}
