class AddFeaturedWork < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :featured_artwork_id, :integer
    add_column :artists, :image, :string
  end
end
