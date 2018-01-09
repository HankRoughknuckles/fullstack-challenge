require 'digest'
# TODO: refactor all comic api stuff into one wrapper class
require 'comic'

class Api::ComicsController < ApplicationController
  include Roar::Rails::ControllerAdditions
  respond_to :json

  def index
    comics = FetchComics.perform(search_params: comic_params)
    if comics.success?
      respond_with comics.result, :represent_items_with => ComicRepresenter
    end
  end

  def show
    @comic = Comic.search(params[:comic_id])
    respond_with @comic, :represent_with => ComicRepresenter
  end

  def upvotes
    up_votes = FetchUpVotes.perform
    respond_with up_votes.result, :represent_items_with => UpVotesRepresenter
  end

  def upvote
    up_vote = UpVote.perform(up_vote_params[:comic_id])

    if up_vote.success?
      render json: { success: true, error: nil }
    else
      render json: { success: false, error: 'Vote failed to save' }
    end
  end

  private

  def comic_params
    params.permit(:page, :title).to_h
  end

  def up_vote_params
    params.permit(:comic_id).to_h
  end
end
