import faker
from faker import Faker
fake = Faker('el_GR')

def generate_fake_article():
    title = fake.catch_phrase()
    author = fake.name()
    date = fake.date()
    content = fake.paragraphs(nb=5)

    article = f"""
    Title: {title}
    {' '.join(content)}
    """

    return article

# Generate a fake sports article
fake_article = generate_fake_article()
print(fake_article)

