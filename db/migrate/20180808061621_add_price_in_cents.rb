class AddPriceInCents < ActiveRecord::Migration[5.1]
  def change
    add_column :bids, :price_in_cents, :integer
    add_column :artwork_logs, :price_in_cents, :integer
    add_column :artworks, :price_in_cents, :integer
  end
end
