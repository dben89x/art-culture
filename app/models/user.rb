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

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_format_of :email,:with => Devise::email_regexp
  validates_length_of :bio, minimum: 15, maximum: 500, allow_blank: true
  validates_length_of :phone_number, minimum: 10, allow_blank: true
  # validates_numericality_of :phone_number
  # validates_format_of :website, :with => URI::regexp(%w(http https))
  # validates_format_of :website, :with => URI::regexp

  # validates_format_of :website, :with => /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix
  has_many :bids, inverse_of: :user
  has_many :artwork_logs, inverse_of: :user
  has_many :artworks
  has_many :user_artwork_favorites

  # attr_accessor :image, :image_cache
  # mount_uploader :image, UserAvatarUploader

  def as_json(options={})
    super(options.merge({:methods => :type}))
  end

  def admin?
   false
  end

  def artwork_favorites
    Artwork.where(id: self.user_artwork_favorites.pluck(:artwork_id).uniq)
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
