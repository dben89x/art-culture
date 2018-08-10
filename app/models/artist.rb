# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string
#  last_name              :string
#  phone_number           :string
#  type                   :string
#  bio                    :text
#  image                  :string
#  location               :string
#  slug                   :string
#  featured_artwork_id    :integer
#  website                :string
#

class Artist < User
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :artworks, inverse_of: :artist
  has_many :artwork_logs, inverse_of: :artist
  belongs_to :featured_artwork, class_name: 'Artwork', optional: true

  after_create :notify_admin

  def full_name
    "#{first_name} #{last_name}"
  end

  def featured_artwork
    featured_artwork_id ? Artwork.find(featured_artwork_id) : self.artworks.last
  end

  def categories
    ArtworkCategory.find(self.artworks.pluck(:artwork_category_id)).pluck(:title).map(&:capitalize)
  end

  def notify_admin
    UserMailer.new_artist(ENV['SELLER_EMAIL'], self)
  end

  def as_json(options = {})
    if options[:index]
      # super(options.merge( methods: [
      #   id: id,
      #   name: full_name,
      #   image: image,
      #   featured_artwork: featured_artwork.image,
      #   artworks: artworks,
      #   categories: categories,
      #   bio: bio,
      #   slug: slug,
      # ]))
      {
        id: id,
        name: full_name,
        image: image,
        featured_artwork: featured_artwork.image,
        artworks: artworks,
        categories: categories,
        bio: bio,
        slug: slug,
      }
    else
      super
    end
  end
end
