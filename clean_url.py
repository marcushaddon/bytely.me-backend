import validators

def clean_url(url):
    # TODO:
    if not validators.url(url):
        raise ValueError
    return url