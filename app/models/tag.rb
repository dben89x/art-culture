# == Schema Information
#
# Table name: tags
#
#  id    :bigint(8)        not null, primary key
#  title :string
#

class Tag < ApplicationRecord

  has_many :artwork_tags, inverse_of: :tag
end
