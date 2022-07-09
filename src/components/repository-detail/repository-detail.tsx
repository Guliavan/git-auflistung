import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'repository-detail',
    styleUrl: 'repository-detail.css',
    shadow: true,
})
export class RepositoryDetail {

    @Prop() repoInfo:any = null;

    render() {
        return (
            <Host>
                {this.repoInfo ? JSON.stringify(this.repoInfo)
                    : 'No information found for this repository'}
            </Host>
        );
    }

}
