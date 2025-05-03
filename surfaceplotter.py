import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def psurface(u, v):
    """Define parametric equation here"""
    # u in [0, 2π], v in [-w, w] (w = half width)
    r = 1
    x = .5*(r + np.cos(u / 2) * np.sin(v) - np.sin(u / 2) * np.sin(2 * v)) * np.cos(u) + 1.1
    y = .4*(r + np.cos(u / 2) * np.sin(v) - np.sin(u / 2) * np.sin(2 * v)) * np.sin(u) + 1.1
    z = .4*np.sin(u / 2) * np.sin(v) + np.cos(u / 2) * np.sin(2 * v) + 1.05
    return x, y, z

def check_within_cube(x, y, z, cube_origin=(0,0,0), cube_size=1.0):
    """Check if all points lie within a cube of given size and origin."""
    x0, y0, z0 = cube_origin
    print(f"x range: {x.min():.4f} to {x.max():.4f} (Δ = {x.max() - x.min():.4f})")
    print(f"y range: {y.min():.4f} to {y.max():.4f} (Δ = {y.max() - y.min():.4f})")
    print(f"z range: {z.min():.4f} to {z.max():.4f} (Δ = {z.max() - z.min():.4f})")

    return (
        x.min() >= x0 and x.max() <= x0 + cube_size,
        y.min() >= y0 and y.max() <= y0 + cube_size,
        z.min() >= z0 and z.max() <= z0 + cube_size
    )

def main():
    u = np.linspace(0, 2 * np.pi, 100)
    v = np.linspace(0, 2*np.pi, 100)  # Width of Möbius strip
    u, v = np.meshgrid(u, v)

    x, y, z = psurface(u, v)

    # Normalize the surface to fit in a cube if needed
    x_shifted = x
    y_shifted = y
    z_shifted = z

    x_range = x_shifted.max()
    y_range = y_shifted.max()
    z_range = z_shifted.max()

    max_range = max(x_range, y_range, z_range)
    scale = 1.0 / max_range

    x_scaled = x_shifted * scale
    y_scaled = y_shifted * scale
    z_scaled = z_shifted * scale

    fits_in_cube = check_within_cube(x_scaled, y_scaled, z_scaled)

    print("Fits inside unit cube:", fits_in_cube)

    # Plotting
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot_surface(x_scaled, y_scaled, z_scaled, cmap='viridis')

    r = [0, 1]
    for x in r:
        for y in r:
            ax.plot([x, x], [y, y], [0, 1], color='red')  # vertical lines

    for x in r:
        for z in r:
            ax.plot([x, x], [0, 1], [z, z], color='red')  # depth lines

    for y in r:
        for z in r:
            ax.plot([0, 1], [y, y], [z, z], color='red')  # horizontal lines


    ax.set_title("Möbius Strip (scaled to fit unit cube)")
    plt.show()

if __name__ == "__main__":
    main()
