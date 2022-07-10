import { newSpecPage } from '@stencil/core/testing';
import { RepositoryDetail } from '../repository-detail';

describe('repository-detail', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [RepositoryDetail],
            html: `<repository-detail></repository-detail>`,
        });
        expect(page.root).toEqualHtml(`
            <repository-detail>
                <mock:shadow-root>
                    No information found for this repository
                </mock:shadow-root>
            </repository-detail>
        `);
    });
});
it('renders with repository info', async () => {
    const page = await newSpecPage({
        components: [RepositoryDetail],
        html: `<repository-detail></repository-detail>`,
    });

    const repoDetail = page.doc.querySelector('repository-detail');
    repoDetail.repoInfo = {
        name: 'Some repo',
        description: null, // Avoid description because of unknown bug with emoji convertor initialization
        language: 'English',
        license: { name: 'Some license' },
        stargazers_count: 345,
        homepage: 'http://somepage.tld',
        clone_url: 'http://someproject.git.tld'
    };
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
        <repository-detail>
            <mock:shadow-root>
            <article>
                <header>
                <h2>
                    Repository Information
                </h2>
                </header>
                <section class=\"repository_detail__list\">
                <label class=\"repository_detail__list_key\" htmlfor=\"repoName\">
                    Name:
                </label>
                <div id=\"repoName\">
                    Some repo
                </div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoDescription\">
                    Description:
                </label>
                <div id=\"repoDescription\"></div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoLanguage\">
                    Language:
                </label>
                <div id=\"repoLanguage\">
                    English
                </div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoLicense\">
                    License:
                </label>
                <div id=\"repoLicense\">
                    Some license
                </div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoStars\">
                    Star Count:
                </label>
                <div id=\"repoStars\">
                    345
                </div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoHomepage\">
                    Homepage:
                </label>
                <div id=\"repoHomepage\">
                    <a href=\"http://somepage.tld\" target=\"_blank\">
                    http://somepage.tld
                    </a>
                </div>
                <label class=\"repository_detail__list_key\" htmlfor=\"repoCloneURL\">
                    Git URL:
                </label>
                <div id=\"repoCloneURL\">
                    <a href=\"http://someproject.git.tld\" target=\"_blank\">
                    http://someproject.git.tld
                    </a>
                </div>
                </section>
            </article>
            </mock:shadow-root>
        </repository-detail>
    `);
});
