require 'rails_helper'

RSpec.describe FetchComics do

  context 'when a vote is given' do
    let(:comic_id) { 123 }

    context 'and a ComicVote does NOT exist' do
      before { UpVote.perform(comic_id) }

      it 'creates a ComicVote object with votes == 1' do
        comic_votes = ComicVote.find_by(comic_id: comic_id)
        expect(comic_votes).not_to be_nil
        expect(comic_votes.votes).to eq 1
      end
    end

    context 'and a ComicVote already exists' do
      before do
        ComicVote.create(comic_id: comic_id)
      end

      it 'does not create any new ComicVote objects' do
        expect{ UpVote.perform(comic_id) }.not_to change { ComicVote.count }
      end

      it 'increments votes on the existing object' do
        expect{ UpVote.perform(comic_id) }
          .to change { ComicVote.find_by(comic_id: comic_id).votes }
          .by(1)
      end
    end
  end
end
