class AddFeaturedImage < ActiveRecord::Migration[5.1]
  def change
    add_column :artworks, :featured_image_id, :integer
  end
end
