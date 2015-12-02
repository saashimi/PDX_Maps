def write_route():

    filename = 'raw_routes.txt'

    part1 = "<option value="
    part2 = "</option>"
    with open(filename) as f:
        for line in f:
            a = line.strip().split("-")
            value, name = a[0], a[1]
            print(part1 + '\"' + value + '\"' + ">" + value + "-" + name + part2)

if __name__ == "__main__":
    write_route()