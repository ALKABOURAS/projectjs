from faker import Faker
fake = Faker('el_GR')
for i in range(100):
    # print fake mens name
    print(fake.name_male())
    print(fake.phone_number())
