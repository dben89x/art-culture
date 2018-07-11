def destroy_all_humans
  if Rails.env.development?
    Artist.delete_all
    Artwork.delete_all
  end
end

destroy_all_humans

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
