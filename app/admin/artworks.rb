ActiveAdmin.register Artwork do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  menu parent: 'Art'
  permit_params :artwork_category_id, :user_id, :title, :published, :description, :bio, :price

  index do
    selectable_column
    # column "Image" do |artwork|
    #   image_tag artwork.artwork_images.first, class: 'admin-img'
    # end
    column :published
    column :title
    column :artist
    column :description
    column :price
    column :bio
    column :artwork_category
    column "Owner", :user
    actions
  end

  form do |f|
    # @artist = Artist.find(params[:id])
    f.semantic_errors # shows errors on :base
    inputs "Admin Actions" do
      input :published
      input :price
      input :artwork_category
      input :user, label: 'Owner'
    end
    inputs 'Artwork Details' do
      input :title
      input :description
      input :bio
    end
    f.actions         # adds the 'Submit' and 'Cancel' buttons
  end

  show do
    panel "Table of Contents" do
      # artwork.artwork_images[0].url
      @artwork = Artwork.find(params[:id])
      attributes_table do
        row :featured_image do
          image_tag @artwork.artwork_images[0].url
        end
        row :title
        row :price
        row :artist
        row :artwork_category
        row :user
        row :published
        row :description
        row :bio
        row :created_at
        row :updated_at
      end
    end
    active_admin_comments
  end


  end
