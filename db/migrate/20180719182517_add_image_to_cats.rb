class AddImageToCats < ActiveRecord::Migration[5.1]
  def change
    add_column :artwork_categories, :image, :string
  end
end
