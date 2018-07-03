def destroy_all_humans
  if Rails.env.development?
    Artist.delete_all
    Artwork.delete_all
  end
end

destroy_all_humans

5.times do
  name = Faker::GameOfThrones.character
  artist = Artist.create(
    email: Faker::Internet.email(name),
    # image: 'https://s3-us-west-1.amazonaws.com/art-culture/brooke-cagle-241290-unsplash.jpg',
    # description: Faker::Lorem.sentence(rand(3)),
    bio: Faker::Lorem.sentence(rand(100)),
  )
  rand(1..5).times do
    artwork = Artwork.create(
      title: 'Art Piece Name',
      artist: artist,
    )
    rand(1..5).times do
      ArtworkImage.create(
        url: 'https://s3-us-west-1.amazonaws.com/art-culture/04.jpg',
        artwork: artwork
      )
    end
  end
end
# AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
