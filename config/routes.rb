Rails.application.routes.draw do
  namespace :api , defaults: { format: :json } do
   get 'comics' => 'comics#index'
   get 'comics/upvotes' => 'comics#upvotes'
   get 'comics/:comic_id' => 'comics#show'
   put 'comics/:comic_id/upvote' => 'comics#upvote'
  end
end
