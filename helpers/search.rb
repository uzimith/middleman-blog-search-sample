def strip_tags(text)
    doc = Nokogiri::HTML::DocumentFragment.parse text
    doc.inner_text
end
