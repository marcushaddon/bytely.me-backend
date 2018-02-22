def toten(num):
    if num < 0:
        neg = True
    else:
        neg = False
    absval = abs(num) - (abs(num) % 10)
    return int(-absval if neg else absval)