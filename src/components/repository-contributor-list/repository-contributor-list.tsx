import { Prop, State, Watch } from '@rdd-giga/component-ui/dist/types/stencil-public-runtime';
import { Component, Host, h } from '@stencil/core';

import { QUERY_PARAMS } from '../../global/constants';

const EMPTY_AVATAR_URL = 'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png';

@Component({
    tag: 'repository-contributor-list',
    styleUrl: 'repository-contributor-list.css',
    shadow: true,
})
export class RepositoryContributorList {

    @Prop() contributorList: Array<any> = null;
    @State() fullContributorInfoList = new Array<any>();

    @Watch('contributorList')
    watchHandler(_newValue: string): void {
        this.updateFullControbutorList();
    }

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

    updateFullControbutorList() {
        // Get complete contributor information and update state variable to trigger re-render
        const temporaryList = new Array<any>();
        this.contributorList.map((contributor, index) => {
            this.getFullContributorInfo(contributor).then(
                fullContributorInfo => {
                    temporaryList.push(fullContributorInfo);
                    if (index == this.contributorList.length - 1) {
                        this.fullContributorInfoList = temporaryList;
                    }
                }
            )
        });
    }

    componentDidLoad() {
        this.updateFullControbutorList();
    }

    render() {

        return (
            <Host>
                {this.contributorList && this.contributorList.length > 0 ?
                    <article>
                        <header><h2>Repository Contributors ({this.contributorList.length})</h2></header>
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
                                        <td><img src={fullContributorInfo.avatar_url} class="contributor__avatar" /></td>
                                        <td>{fullContributorInfo.login}</td>
                                        <td>{fullContributorInfo.contributions}</td>
                                        <td>{fullContributorInfo.name}</td>
                                        <td>{fullContributorInfo.company}</td>
                                        <td>{fullContributorInfo.location}</td>
                                    </tr>
                            )}
                        </table>
                    </article>
                    : 'No contributors to display :( !'}
            </Host>
        );
    }

}
