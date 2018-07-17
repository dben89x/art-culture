class Favorites < ActiveRecord::Migration[5.1]
  def change
    create_table :user_artwork_favorites do |t|
      t.belongs_to :artwork
      t.belongs_to :user
      t.timestamps
    end
  end
end
