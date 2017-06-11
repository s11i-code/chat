class PagesController < ApplicationController
  def home
    render template: 'empty.html', layout: true
  end
end
