def destroy_all_humans
  if Rails.env.development?
    Artist.delete_all
    Artwork.delete_all
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
5.times do
  name = Faker::GameOfThrones.character
  first_name = name.split.first
  name.slice!(first_name)
  artist = Artist.create(
    email: Faker::Internet.email(name),
    first_name: first_name,
    last_name: name.strip,
    # image: 'https://s3-us-west-1.amazonaws.com/art-culture/brooke-cagle-241290-unsplash.jpg',
    # description: Faker::Lorem.sentence(rand(3)),
    bio: Faker::Lorem.sentence(rand(100)),
  )
  rand(1..5).times do
    artwork = Artwork.create(
      title: Faker::Lorem.words.join(' ').titleize,
      description: Faker::Lorem.paragraph,
      artist: artist,
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
    # ArtworkImage.create(
    #   url: 'https://s3-us-west-1.amazonaws.com/art-culture/images/a4.jpg',
    #   artwork: artwork,
    # )
  end
end
# AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
