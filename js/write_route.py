def write_route():

    filename = 'raw_routes.txt'

    dct = {}
    with open(filename) as f:
        for line in f:
            a = line.strip().split("-")
            route, name = a[0], a[1]
            dct[route] = name
    print(dct)

if __name__ == "__main__":
    write_route()