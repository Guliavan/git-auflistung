import { newE2EPage } from '@stencil/core/testing';

describe('app-home', () => {

    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-listing></app-listing>');

        const element = await page.find('app-listing >>> .app-listing');
        expect(element).toBeDefined();
    });

    it('contains a "search form"', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-listing></app-listing>');

        const element = await page.find('app-listing >>> form.repository-search__form');
        expect(element).toBeDefined();
    });

    it('contains a "repository-detail"', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-listing></app-listing>');

        const element = await page.find('app-listing >>> article.repository-detail');
        expect(element).toBeDefined();
    });

    it('displays empty results on dummy search', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-listing></app-listing>');

        const ownerInput = await page.find('app-listing >>> #searchOwnerName');
        expect(ownerInput).toBeDefined();

        await ownerInput.type('x');
        await ownerInput.type('z');
        await ownerInput.type('y');
        await ownerInput.type('o');
        await ownerInput.type('b');

        const repoInput = await page.find('app-listing >>> #searchRepository');
        expect(repoInput).toBeDefined();

        await repoInput.type('x');
        await repoInput.type('z');
        await repoInput.type('y');
        await repoInput.type('o');
        await repoInput.type('b');

        const searchButton = await page.find('app-listing >>> #searchButton');
        expect(searchButton).toBeDefined();
        await searchButton.click();
        await page.waitForTimeout(3000); // Wait for server response

        const repoDetailArticle = await page.find('app-listing >>> article.repository-detail');
        expect(repoDetailArticle).toBeDefined();
        expect(repoDetailArticle.innerText).toEqual('No information found for given repository / owner :(');
    });

    it('displays result on succesfull search', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-listing></app-listing>');

        const ownerInput = await page.find('app-listing >>> #searchOwnerName');
        expect(ownerInput).toBeDefined();

        await ownerInput.setProperty('value', '');
        await ownerInput.type('n');
        await ownerInput.type('o');
        await ownerInput.type('d');
        await ownerInput.type('e');
        await ownerInput.type('j');
        await ownerInput.type('s');

        const repoInput = await page.find('app-listing >>> #searchRepository');
        expect(repoInput).toBeDefined();

        await repoInput.setProperty('value', '');
        await repoInput.type('n');
        await repoInput.type('o');
        await repoInput.type('d');
        await repoInput.type('e');

        const searchButton = await page.find('app-listing >>> #searchButton');
        expect(searchButton).toBeDefined();
        await searchButton.click();
        await page.waitForTimeout(3000); // Wait for server response

        const repoDetailArticle = await page.find('app-listing >>> article.repository-detail');
        expect(repoDetailArticle).toBeDefined();
        expect(repoDetailArticle.innerHTML).toEqual(`<section><repository-detail class=\"hydrated\"></repository-detail><repository-contributor-list class=\"hydrated\"></repository-contributor-list></section>`);
    });
});
