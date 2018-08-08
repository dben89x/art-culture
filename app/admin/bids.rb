ActiveAdmin.register Bid do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  menu parent: 'Art'
  config.batch_actions = true
  index do
    selectable_column
    column :artwork
    column :user
    column :price
    column :notes
    column :open
    column :accepted
    column :created_at
    actions
  end
end
