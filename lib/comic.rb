class Comic
  class << self
    def search(comic_id)
      new(comic_id).search
    end
  end

  def initialize(api_client = Marvel::Client.new, id)
    @api_client = api_client
    @id = id
    @details = nil
  end

  def search
    @api_client.comic(@id).try(:first)
  end
end
