# == Schema Information
#
# Table name: requests
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  email      :string
#  phone      :string
#  message    :text
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Request < ApplicationRecord
end
