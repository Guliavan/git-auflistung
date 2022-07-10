import { Component, Host, h, Prop } from '@stencil/core';
import { EmojiConvertor } from 'emoji-js';

/**
 * Repository Detail component. Takes repository info JSON as parameter and displays information.
 */
@Component({
    tag: 'repository-detail',
    styleUrl: 'repository-detail.css',
    shadow: true,
})
export class RepositoryDetail {

    /**
     * The repository info JSON with this format returned by Github API. Displaying keys that are considered for this component:
     * {
            name: 'Repository Name',
            description: 'Repository Description'
            language: 'English',
            license: { name: 'License Name' },
            stargazers_count: 345,
            homepage: 'http://homepage.tld',
            clone_url: 'http://git-clone-url.git.tld'
     *  }
     */
    @Prop() repoInfo: any = null;

    convertPossibleEmojis(text: string) {
        let result = text;
        if (text) {
            const emojiConverter = new EmojiConvertor();
            result = emojiConverter.replace_colons(text);
        }
        return result;
    }

    render() {
        return (
            <Host>
                {this.repoInfo ?
                    <article>
                        <header><h2>Repository Information</h2></header>
                        <section class="repository_detail__list">
                            <label htmlFor="repoName" class="repository_detail__list_key">Name:</label>
                            <div id="repoName">{this.repoInfo.name ? this.repoInfo.name : ''}</div>
                            <label htmlFor="repoDescription" class="repository_detail__list_key">Description:</label>
                            <div id="repoDescription">{this.repoInfo.description ? this.convertPossibleEmojis(this.repoInfo.description) : ''}</div>
                            <label htmlFor="repoLanguage" class="repository_detail__list_key">Language:</label>
                            <div id="repoLanguage">{this.repoInfo.language ? this.repoInfo.language : ''}</div>
                            <label htmlFor="repoLicense" class="repository_detail__list_key">License:</label>
                            <div id="repoLicense">{this.repoInfo.license ? this.repoInfo.license.name : ''}</div>
                            <label htmlFor="repoStars" class="repository_detail__list_key">Star Count:</label>
                            <div id="repoStars">{this.repoInfo.stargazers_count ? this.repoInfo.stargazers_count : ''}</div>
                            <label htmlFor="repoHomepage" class="repository_detail__list_key">Homepage:</label>
                            <div id="repoHomepage"><a href={this.repoInfo.homepage} target='_blank'>{this.repoInfo.homepage ? this.repoInfo.homepage : ''}</a></div>
                            <label htmlFor="repoCloneURL" class="repository_detail__list_key">Git URL:</label>
                            <div id="repoCloneURL"><a href={this.repoInfo.clone_url} target='_blank'>{this.repoInfo.clone_url ? this.repoInfo.clone_url : ''}</a></div>
                        </section>
                    </article>
                    : 'No information found for this repository'}
            </Host>
        );
    }

}
