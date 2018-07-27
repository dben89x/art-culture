def destroy_all_humans
  if Rails.env.development?
    Artist.delete_all
    Artwork.delete_all
    ArtworkImage.delete_all
    ArtworkCategory.delete_all
  end
end

destroy_all_humans

ArtworkCategory.create(
  title: 'abstract',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style1.jpg'
)
ArtworkCategory.create(
  title: 'modern',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style2.jpg'
)
ArtworkCategory.create(
  title: 'pop',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style3.jpg'
)
ArtworkCategory.create(
  title: 'renaissance',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style4.jpg'
)
ArtworkCategory.create(
  title: 'surreal',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style5.jpg'
)
ArtworkCategory.create(
  title: 'contemporary',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style6.jpg'
)
ArtworkCategory.create(
  title: 'nouveau',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style7.jpg'
)
ArtworkCategory.create(
  title: 'symbolism',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style8.jpg'
)
ArtworkCategory.create(
  title: 'realism',
  image: 'https://s3-us-west-1.amazonaws.com/art-culture/images/style9.jpg'
)
15.times do

  name = Faker::GameOfThrones.character
  first_name = name.split.first
  name = name.split.length > 1 ? name.slice(first_name) : name
  Faker::Internet.email(name)
  buyer = Buyer.create(
    email: Faker::Internet.email(name),
    first_name: first_name,
    last_name: name.strip,
    password: 'asdfasdf',
    password_confirmation: 'asdfasdf',
    bio: Faker::Lorem.sentence(rand(100)),
  )

  name = Faker::GameOfThrones.character
  first_name = name.split.first
  name = name.split.length > 1 ? name.slice(first_name) : name
  artist = Artist.create(
    email: Faker::Internet.email(name),
    first_name: first_name,
    last_name: name.strip,
    image: 'https://s3-us-west-1.amazonaws.com/art-culture/brooke-cagle-241290-unsplash.jpg',
    # description: Faker::Lorem.sentence(rand(3)),
    password: 'asdfasdf',
    password_confirmation: 'asdfasdf',
    bio: Faker::Lorem.sentence(rand(100)),
  )

  rand(1..5).times do
    artwork = Artwork.create(
      title: Faker::Lorem.words.join(' ').titleize,
      description: Faker::Lorem.paragraph,
      artwork_category: ArtworkCategory.all.sample,
      artist: artist,
      price: rand(500..2000)
    )
    ArtworkImage.create(
      url: 'https://s3-us-west-1.amazonaws.com/art-culture/images/a2.jpg',
      artwork: artwork,
    )
    ArtworkImage.create(
      url: 'https://s3-us-west-1.amazonaws.com/art-culture/images/a1.jpg',
      artwork: artwork,
    )
    ArtworkImage.create(
      url: 'https://s3-us-west-1.amazonaws.com/art-culture/images/a3.jpg',
      artwork: artwork,
    )
    buyers = Buyer.all
    3.times do
      buyer = Buyer.all.sample
      price = rand(500..2000)
      time = rand(1.years).seconds.ago
      bid = Bid.create(
        buyer: buyer,
        artwork: artwork,
        price: price,
        notes: Faker::Lorem.paragraph,
        open: false,
        accepted: true
      )
      bid.update_attribute('created_at', time)
      log = ArtworkLog.create(
        artwork: artwork,
        buyer: buyer,
        bid: bid,
        price: price,
        description: Faker::Lorem.paragraph,
      )
      log.update_attribute('created_at', time)
    end
  end
end

# AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
