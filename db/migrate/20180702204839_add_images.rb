class AddImages < ActiveRecord::Migration[5.1]
  def change
    create_table :artwork_images do |t|
      t.belongs_to :artwork
      t.string :url
      t.boolean :published
      t.timestamps
    end
  end
end
