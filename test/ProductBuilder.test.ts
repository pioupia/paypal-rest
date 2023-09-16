import { ProductBuilder } from "../src";
import { ProductCategory, ProductType } from "../src/types/Product";

describe('ProductBuilder errors', () => {
    it('name', () => {
        expect(() => {
            new ProductBuilder()
                .setName('')
        }).toThrow("The length of the name field of a product must be between 1 and 127 characters.")

        expect(() => {
            new ProductBuilder()
                .setName("This is long long text, as long as possible to ensure that the builder sends an error if the title is longer than 127 characters")
        }).toThrow("The length of the name field of a product must be between 1 and 127 characters.")
    });

    it('type', () => {
        expect(() => {
            new ProductBuilder()
                .setType("TEST" as ProductType)
        }).toThrow("The type field of the product is invalid. Allowed type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'.")
    });

    it('description', () => {
        expect(() => {
            new ProductBuilder()
                .setDescription("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
        }).toThrow("The length of the description field of a product must be between 1 and 256 characters.")
    });

    it('id', () => {
        expect(() => {
            new ProductBuilder()
                .setID("abc")
        }).toThrow("The length of the ID field of a product must be between 6 and 50 characters.");

        expect(() => {
            new ProductBuilder()
                .setID("Lorem Ipsum is simply dummy text of the printing an")
        }).toThrow("The length of the ID field of a product must be between 6 and 50 characters.");
    });

    it('category', () => {
        expect(() => {
            new ProductBuilder()
                .setCategory("category" as ProductCategory)
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder()
                .setCategory("CATEGORY SEPARATOR" as ProductCategory)
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder()
                .setCategory("M" as ProductCategory)
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder()
                .setCategory("LOREM_IPSUM_IS_SIMPLY_DUMMY_TEXT_OF_THE_PRINTING_AND_TYPESETTING_INDUSTRY__LOREM_IPSUM_HAS_BEEN_THE_INDUSTRY_S_STANDARD_DUMMY_TEXT_EVER_SINCE_THE_____S__WHEN_AN_UNKNOWN_PRINTER_TOOK_A_GALLEY_OF_TYPE_AND_SCRAMBLED_IT_TO_MAKE_A_TYPE_SPECIMEN_BOOK__IT_HAS_SURV" as ProductCategory)
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");
    });

    it('image url', () => {
        expect(() => {
            new ProductBuilder()
                .setImageUrl("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan magna quis lacus pellentesque, non fringilla leo ultricies. Suspendisse mollis hendrerit massa id porttitor. Phasellus pellentesque posuere massa, quis convallis neque ornare ut. Nunc nisi ante, efficitur sed augue sit amet, ultricies dictum ligula. Nunc tellus urna, malesuada at purus nec, pretium porta est. Curabitur ex est, ultricies quis dapibus sit amet, eleifend eget est. Pellentesque malesuada sed augue non condimentum. Phasellus non leo consequat, congue augue a, porta sem. Nulla semper libero in mauris iaculis, non rutrum ex congue. Mauris consequat diam imperdiet hendrerit eleifend. Donec velit purus, finibus ut cursus ut, dictum vel eros. Vestibulum rutrum viverra sollicitudin. Donec posuere viverra tellus, sed maximus tortor scelerisque vitae. Aliquam convallis nec quam non vestibulum. Duis imperdiet fermentum sem, et lacinia est commodo quis. Nunc accumsan rhoncus nulla eget semper. Nullam mi ex, sagittis at nibh vitae, eleifend condimentum enim. Pellentesque ornare mi sed risus consequat iaculis. Aenean ut enim feugiat, vehicula dui quis, auctor lectus. Nullam dolor nunc, semper eget convallis at, tincidunt nec velit. Suspendisse potenti. Sed nec purus aliquet, venenatis leo eget, semper dui. Vivamus ut turpis eleifend, pellentesque arcu eget, scelerisque libero. Vivamus dapibus ex sit amet consequat sagittis. Quisque condimentum lectus ac arcu rhoncus, vel luctus neque facilisis. Ut enim augue, facilisis eget nunc sit amet, placerat ullamcorper ipsum. Maecenas metus tortor, cursus quis vehicula id, tincidunt ac diam. Phasellus vel arcu augue. In hac habitasse platea dictumst. Morbi nec risus ut nibh tristique porttitor. Suspendisse justo massa, dignissim sed nisi vel, varius aliquet justo. Nulla commodo interdum odio non commodo. Integer at nulla consequat felis sollicitudin aliquam. Maecenas mattis sapien dolor, at ultrices nisl ullamcorper ac. Vestibulum iaculis sit amet quam.")
        }).toThrow("The length of the image_url field of a product must be between 1 and 2000 characters.");
    });

    it('home url', () => {
        expect(() => {
            new ProductBuilder()
                .setHomeUrl("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan magna quis lacus pellentesque, non fringilla leo ultricies. Suspendisse mollis hendrerit massa id porttitor. Phasellus pellentesque posuere massa, quis convallis neque ornare ut. Nunc nisi ante, efficitur sed augue sit amet, ultricies dictum ligula. Nunc tellus urna, malesuada at purus nec, pretium porta est. Curabitur ex est, ultricies quis dapibus sit amet, eleifend eget est. Pellentesque malesuada sed augue non condimentum. Phasellus non leo consequat, congue augue a, porta sem. Nulla semper libero in mauris iaculis, non rutrum ex congue. Mauris consequat diam imperdiet hendrerit eleifend. Donec velit purus, finibus ut cursus ut, dictum vel eros. Vestibulum rutrum viverra sollicitudin. Donec posuere viverra tellus, sed maximus tortor scelerisque vitae. Aliquam convallis nec quam non vestibulum. Duis imperdiet fermentum sem, et lacinia est commodo quis. Nunc accumsan rhoncus nulla eget semper. Nullam mi ex, sagittis at nibh vitae, eleifend condimentum enim. Pellentesque ornare mi sed risus consequat iaculis. Aenean ut enim feugiat, vehicula dui quis, auctor lectus. Nullam dolor nunc, semper eget convallis at, tincidunt nec velit. Suspendisse potenti. Sed nec purus aliquet, venenatis leo eget, semper dui. Vivamus ut turpis eleifend, pellentesque arcu eget, scelerisque libero. Vivamus dapibus ex sit amet consequat sagittis. Quisque condimentum lectus ac arcu rhoncus, vel luctus neque facilisis. Ut enim augue, facilisis eget nunc sit amet, placerat ullamcorper ipsum. Maecenas metus tortor, cursus quis vehicula id, tincidunt ac diam. Phasellus vel arcu augue. In hac habitasse platea dictumst. Morbi nec risus ut nibh tristique porttitor. Suspendisse justo massa, dignissim sed nisi vel, varius aliquet justo. Nulla commodo interdum odio non commodo. Integer at nulla consequat felis sollicitudin aliquam. Maecenas mattis sapien dolor, at ultrices nisl ullamcorper ac. Vestibulum iaculis sit amet quam.")
        }).toThrow("The length of the home_url field of a product must be between 1 and 2000 characters.");
    });
});

describe('ProductBuilder values', () => {
    const { name, description, type, id, image_url, home_url, category } = new ProductBuilder()
        .setName('test name')
        .setDescription('test product builder description')
        .setType('DIGITAL')
        .setID('test id')
        .setImageUrl('https://my-image.com/url')
        .setHomeUrl('https://my-home.com/url')
        .setCategory('WEB_HOSTING_AND_DESIGN')
        .toJSON();

    const pb = new ProductBuilder({
        name: 'test name',
        description: 'test product builder description',
        type: 'DIGITAL',
        id: 'test id',
        image_url: 'https://my-image.com/url',
        home_url: 'https://my-home.com/url',
        category: 'WEB_HOSTING_AND_DESIGN'
    })
        .toJSON();

    it('name', () => {
        expect(name).toBe("test name");
        expect(pb.name).toBe("test name");
    });

    it('type', () => {
        expect(type).toBe("DIGITAL");
        expect(pb.type).toBe("DIGITAL");
    });

    it('description', () => {
        expect(description).toBe("test product builder description");
        expect(pb.description).toBe("test product builder description");
    });

    it('id', () => {
        expect(id).toBe("test id");
        expect(pb.id).toBe("test id");
    });

    it('category', () => {
        expect(category).toBe("WEB_HOSTING_AND_DESIGN");
        expect(pb.category).toBe("WEB_HOSTING_AND_DESIGN");
    });

    it('image url', () => {
        expect(image_url).toBe("https://my-image.com/url");
        expect(pb.image_url).toBe("https://my-image.com/url");
    });

    it('home url', () => {
        expect(home_url).toBe("https://my-home.com/url");
        expect(pb.home_url).toBe("https://my-home.com/url");
    });
});

describe('ProductBuilder toJSON error', () => {
    it('empty data', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test name'
            }).toJSON();
        }).toThrow("The name and type field of a product are required.")

        expect(() => {
            new ProductBuilder({
                type: 'DIGITAL'
            }).toJSON();
        }).toThrow("The name and type field of a product are required.")

        expect(() => {
            new ProductBuilder({
                name: '',
                type: '' as ProductType
            }).toJSON();
        }).toThrow("The name and type field of a product are required.")
    });

    it('name', () => {
        expect(() => {
            new ProductBuilder({
                name: 'This is long long text, as long as possible to ensure that the builder sends an error if the title is longer than 127 characters',
                type: "DIGITAL"
            }).toJSON();
        }).toThrow("The length of the name field of a product must be between 1 and 127 characters.")
    });

    it('type', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "TEST" as ProductType
            }).toJSON();
        }).toThrow("The type field of the product is invalid. Allowed type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'.")
    });

    it('description', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }).toJSON();
        }).toThrow("The length of the description field of a product must be between 1 and 256 characters.")
    });

    it('id', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                id: 'abc'
            }).toJSON();
        }).toThrow("The length of the ID field of a product must be between 6 and 50 characters.");

        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                id: 'Lorem Ipsum is simply dummy text of the printing an'
            }).toJSON();
        }).toThrow("The length of the ID field of a product must be between 6 and 50 characters.");
    });

    it('category', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                category: 'category' as ProductCategory
            }).toJSON();
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                category: 'CATEGORY SEPARATOR' as ProductCategory
            }).toJSON();
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                category: 'M' as ProductCategory
            }).toJSON();
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                category: 'LOREM_IPSUM_IS_SIMPLY_DUMMY_TEXT_OF_THE_PRINTING_AND_TYPESETTING_INDUSTRY__LOREM_IPSUM_HAS_BEEN_THE_INDUSTRY_S_STANDARD_DUMMY_TEXT_EVER_SINCE_THE_____S__WHEN_AN_UNKNOWN_PRINTER_TOOK_A_GALLEY_OF_TYPE_AND_SCRAMBLED_IT_TO_MAKE_A_TYPE_SPECIMEN_BOOK__IT_HAS_SURV' as ProductCategory
            }).toJSON();
        }).toThrow("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");
    });

    it('image url', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                image_url: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan magna quis lacus pellentesque, non fringilla leo ultricies. Suspendisse mollis hendrerit massa id porttitor. Phasellus pellentesque posuere massa, quis convallis neque ornare ut. Nunc nisi ante, efficitur sed augue sit amet, ultricies dictum ligula. Nunc tellus urna, malesuada at purus nec, pretium porta est. Curabitur ex est, ultricies quis dapibus sit amet, eleifend eget est. Pellentesque malesuada sed augue non condimentum. Phasellus non leo consequat, congue augue a, porta sem. Nulla semper libero in mauris iaculis, non rutrum ex congue. Mauris consequat diam imperdiet hendrerit eleifend. Donec velit purus, finibus ut cursus ut, dictum vel eros. Vestibulum rutrum viverra sollicitudin. Donec posuere viverra tellus, sed maximus tortor scelerisque vitae. Aliquam convallis nec quam non vestibulum. Duis imperdiet fermentum sem, et lacinia est commodo quis. Nunc accumsan rhoncus nulla eget semper. Nullam mi ex, sagittis at nibh vitae, eleifend condimentum enim. Pellentesque ornare mi sed risus consequat iaculis. Aenean ut enim feugiat, vehicula dui quis, auctor lectus. Nullam dolor nunc, semper eget convallis at, tincidunt nec velit. Suspendisse potenti. Sed nec purus aliquet, venenatis leo eget, semper dui. Vivamus ut turpis eleifend, pellentesque arcu eget, scelerisque libero. Vivamus dapibus ex sit amet consequat sagittis. Quisque condimentum lectus ac arcu rhoncus, vel luctus neque facilisis. Ut enim augue, facilisis eget nunc sit amet, placerat ullamcorper ipsum. Maecenas metus tortor, cursus quis vehicula id, tincidunt ac diam. Phasellus vel arcu augue. In hac habitasse platea dictumst. Morbi nec risus ut nibh tristique porttitor. Suspendisse justo massa, dignissim sed nisi vel, varius aliquet justo. Nulla commodo interdum odio non commodo. Integer at nulla consequat felis sollicitudin aliquam. Maecenas mattis sapien dolor, at ultrices nisl ullamcorper ac. Vestibulum iaculis sit amet quam."
            }).toJSON();
        }).toThrow("The length of the image_url field of a product must be between 1 and 2000 characters.");
    });

    it('home url', () => {
        expect(() => {
            new ProductBuilder({
                name: 'test',
                type: "DIGITAL",
                home_url: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan magna quis lacus pellentesque, non fringilla leo ultricies. Suspendisse mollis hendrerit massa id porttitor. Phasellus pellentesque posuere massa, quis convallis neque ornare ut. Nunc nisi ante, efficitur sed augue sit amet, ultricies dictum ligula. Nunc tellus urna, malesuada at purus nec, pretium porta est. Curabitur ex est, ultricies quis dapibus sit amet, eleifend eget est. Pellentesque malesuada sed augue non condimentum. Phasellus non leo consequat, congue augue a, porta sem. Nulla semper libero in mauris iaculis, non rutrum ex congue. Mauris consequat diam imperdiet hendrerit eleifend. Donec velit purus, finibus ut cursus ut, dictum vel eros. Vestibulum rutrum viverra sollicitudin. Donec posuere viverra tellus, sed maximus tortor scelerisque vitae. Aliquam convallis nec quam non vestibulum. Duis imperdiet fermentum sem, et lacinia est commodo quis. Nunc accumsan rhoncus nulla eget semper. Nullam mi ex, sagittis at nibh vitae, eleifend condimentum enim. Pellentesque ornare mi sed risus consequat iaculis. Aenean ut enim feugiat, vehicula dui quis, auctor lectus. Nullam dolor nunc, semper eget convallis at, tincidunt nec velit. Suspendisse potenti. Sed nec purus aliquet, venenatis leo eget, semper dui. Vivamus ut turpis eleifend, pellentesque arcu eget, scelerisque libero. Vivamus dapibus ex sit amet consequat sagittis. Quisque condimentum lectus ac arcu rhoncus, vel luctus neque facilisis. Ut enim augue, facilisis eget nunc sit amet, placerat ullamcorper ipsum. Maecenas metus tortor, cursus quis vehicula id, tincidunt ac diam. Phasellus vel arcu augue. In hac habitasse platea dictumst. Morbi nec risus ut nibh tristique porttitor. Suspendisse justo massa, dignissim sed nisi vel, varius aliquet justo. Nulla commodo interdum odio non commodo. Integer at nulla consequat felis sollicitudin aliquam. Maecenas mattis sapien dolor, at ultrices nisl ullamcorper ac. Vestibulum iaculis sit amet quam."
            }).toJSON();
        }).toThrow("The length of the home_url field of a product must be between 1 and 2000 characters.");
    });
});