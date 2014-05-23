
function screenWrap (sprite, bounds) {

    if (sprite.x < 0)
    {
        sprite.body.x = bounds.width;
    }
    else if (sprite.x > bounds.width)
    {
        sprite.body.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.body.y = bounds.height;
    }
    else if (sprite.y > bounds.height)
    {
        sprite.body.y = 0;
    }

}