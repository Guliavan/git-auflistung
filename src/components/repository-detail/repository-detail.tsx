import { Component, Host, h, Prop } from '@stencil/core';
import { EmojiConvertor } from 'emoji-js';

@Component({
    tag: 'repository-detail',
    styleUrl: 'repository-detail.css',
    shadow: true,
})
export class RepositoryDetail {

    private emojiConverter = new EmojiConvertor();

    @Prop() repoInfo: any = null;

    render() {
        return (
            <Host>
                {this.repoInfo ?
                    <article>
                        <header><h2>Repository Information</h2></header>
                        <section class="repository_detail__list">
                            <div class="repository_detail__list_key">Name:</div><div>{this.repoInfo.name}</div>
                            <div class="repository_detail__list_key">Description:</div><div>{this.emojiConverter.replace_colons(this.repoInfo.description)}</div>
                            <div class="repository_detail__list_key">Language:</div><div>{this.repoInfo.language}</div>
                            <div class="repository_detail__list_key">License:</div><div>{this.repoInfo.license ? this.repoInfo.license.name : ''}</div>
                            <div class="repository_detail__list_key">Star Count:</div><div>{this.repoInfo.stargazers_count}</div>
                            <div class="repository_detail__list_key">Homepage:</div><div><a href={this.repoInfo.homepage} target='_blank'>{this.repoInfo.homepage}</a></div>
                            <div class="repository_detail__list_key">Git URL:</div><div><a href={this.repoInfo.clone_url} target='_blank'>{this.repoInfo.clone_url}</a></div>
                        </section>
                    </article>
                    : 'No information found for this repository'}
            </Host>
        );
    }

}
