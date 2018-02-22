"""A module that totes needs work."""

def toten(num):
    """
    Round a number to the nearest power of 10.
    """
    if num < 0:
        neg = True
    else:
        neg = False
    absval = abs(num) - (abs(num) % 10)
    return int(-absval if neg else absval)