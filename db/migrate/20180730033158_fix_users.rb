class FixUsers < ActiveRecord::Migration[5.1]
  def change
    drop_table :artists
    drop_table :buyers

    add_column :users, :bio, :text
    add_column :users, :image, :string
    add_column :users, :location, :string
    add_column :users, :slug, :string
    add_column :users, :featured_artwork_id, :integer
  end
end
