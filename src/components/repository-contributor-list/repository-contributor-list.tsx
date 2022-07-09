import { Prop } from '@rdd-giga/component-ui/dist/types/stencil-public-runtime';
import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'repository-contributor-list',
    styleUrl: 'repository-contributor-list.css',
    shadow: true,
})
export class RepositoryContributorList {

    @Prop() contributorList:Array<any> = null;

    render() {
        return (
            <Host>
            { this.contributorList && this.contributorList.length > 0 ? JSON.stringify(this.contributorList) : 'no contributors info !' }
            </Host>
        );
    }

}
