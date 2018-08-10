ActiveAdmin.register Artist do

  permit_params :first_name, :last_name, :phone_number, :bio, :image, :location, :featured_artwork_id, :featured_artwork, :website, :verified

  form do |f|
    @artist = Artist.find(params[:id])
    f.semantic_errors # shows errors on :base
    inputs "Admin Actions" do
      f.input :featured_artwork, as: :select, collection: Artwork.where(artist: @artist)
      # f.input :featured_artwork
      input :verified
    end
    inputs 'Artist Details' do
      input :first_name
      # li "Created at #{f.object.created_at}" unless f.object.new_record?
      input :last_name
      input :phone_number
      input :bio
      input :image
      input :location
      input :website
    end
    f.actions         # adds the 'Submit' and 'Cancel' buttons

  end

  menu parent: 'Users'
  index do
    selectable_column
    column "Image" do |artist|
      image_tag artist.image, class: 'admin-img'
    end
    column :first_name
    column :last_name
    column :email
    column :website
    column :bio
    column :location
    column :phone_number
    column :verified
    # column :featured_artwork_id
    actions
  end
end
