def destroy_all_humans
  if Rails.env.development?
    Artist.delete_all
    Artwork.delete_all
    ArtworkImage.delete_all
    ArtworkCategory.delete_all

    BlogCategory.delete_all
    BlogTag.delete_all
    BlogPost.delete_all

    Tag.delete_all
    ArtworkTag.delete_all
  end
end

def create_blog_content
  content = (1..rand(2..4)).to_a.collect do
    header = "## #{Faker::Lorem.sentence}"
    paragraphs = (1..rand(1..3)).to_a.collect { Faker::Lorem.paragraph(rand(10..20))}.join('<br/><br/>')

    result =  %Q(\n#{header}\n#{paragraphs}\n\n)
    result
  end
  content.join('<br/>')
end

destroy_all_humans

4.times do
  BlogCategory.create(title: Faker::Lorem.words(rand(2..3)).join(''))
end

12.times do
  BlogTag.create(title: Faker::Lorem.words(rand(2..3)).join(' '))
end

images = ['https://s3-us-west-1.amazonaws.com/art-culture/images/blog1.jpg', 'https://s3-us-west-1.amazonaws.com/art-culture/images/blog2.jpg', 'https://s3-us-west-1.amazonaws.com/art-culture/images/blog3.jpg', 'https://s3-us-west-1.amazonaws.com/art-culture/images/blog4.jpg']
20.times do
  blog_post = BlogPost.create(
    title: Faker::Lorem.words(rand(8..12)).join(' ').titleize,
    image: images.sample,
    description: Faker::Lorem.words(20).join(' ').capitalize,
    overview: Faker::Lorem.words(60).join(' ').capitalize,
    blog_category: BlogCategory.all.sample,
    content: create_blog_content
  )
  rand(1..4).times do
    blog_post.blog_post_tags.create(blog_tag: BlogTag.all.sample)
  end
end

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

30.times do
  Tag.create(title: Faker::Hipster.word)
end

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

    rand(3..5).times do
      ArtworkTag.create(
        tag: Tag.all.sample,
        artwork: artwork
      )
    end

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
        type: 'Sale',
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
