import math

# Infinite
def relative_stiffness( k, h, E = 4*(10**6), nu = 0.15):
    return (E*(h**3)/(12*(1-nu**2)*k))**0.25

def infinite_plate_stress_interior(delta_t,nu=0.15,E = 4*(10**6), alpha_t = 5 * (10**-6)):
    stress_x = (E*alpha_t*delta_t)/(2*(1-nu**2))
    stress_y = (nu*stress_x)
    return (stress_x,stress_y)

def infinite_plate_stress_edge(delta_t,nu=0.15,E = 4*(10**6), alpha_t = 5 * (10**-6)):
    return 

def get_lambda(L, k, h, E = 4*(10**6), nu = 0.15):
    l = relative_stiffness(k, h, E, nu)
    return L/(l*(8**0.5))

def get_C(L, k, h,  E = 4*(10**6), nu = 0.15):
    the_lambda = get_lambda(L, k, h, E, nu)
    return (1 - ((2*(math.cos(the_lambda)*(math.cosh(the_lambda))))/((math.sin(2*the_lambda) + (math.sinh(2*the_lambda))))) * (math.tan(the_lambda) + math.tanh(the_lambda)))

# Finite
def curling_stress_center(Lx, Ly, k, h,  delta_t, alpha_t = 5 * (10**-6), E = 4*(10**6), nu = 0.15):
    the_Cx = get_C(Lx, k, h, E, nu)
    the_Cy = get_C(Ly, k, h, E, nu)
    return (E*alpha_t*delta_t)*(the_Cx + nu*the_Cy)/(2*(1-nu**2))

def curling_stress_edge(L, k, h,  delta_t, alpha_t = 5 * (10**-6), E = 4*(10**6), nu = 0.15 ):
    """
    L should be full
    """
    the_C = get_C(L, k, h, E, nu)
    return (E*alpha_t*delta_t * the_C)/2

# print(finite_stress_edge(12*12, 50, 8, 24))

# Dual Tires #

def a_eq_dual_tires(Pd, q, Sd):
    """
    Pd in lb , just one tire
    q in psi
    Sd in inch
    """
    first_part = ((0.8521 * Pd) / (q*math.pi))
    second_part = (Sd/math.pi)
    third_part = (Pd/(0.5227*q)) ** 0.5
    return (first_part + second_part * third_part) **0.5

# Pd = 6000 # Lb
# q = 80 # psi
# Sd = 14 # inches
# print(a_eq_dual_tires(6000, 80, 14))

def westergaard_corner_loading_stress(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    """
    P is summation of all loading
    """
    first_part = (3*Pd)/(h**2)
    l = relative_stiffness(k, h , E, nu)
    second_part = ((a*(2**0.5)) / (l))**0.6
    return first_part*(1 - second_part)
# Pd = 6000 # lb
# q = 80 # psi
# k = 200 # pci
# Sd = 14 # inch
# h = 10 # inch
# print(westergaard_corner_loading_stress(Pd*2, a_eq_dual_tires(Pd, q, Sd), k, h))

def westergaard_corner_loading_deflection(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    l = relative_stiffness(k, h , E, nu)

    first_part = (Pd/(k*(l**2)))

    second_part = 0.88*((a*(2**0.5))/l)

    return first_part*(1.1 - second_part)


    
def get_equal_square_side(a):
    return 1.772*a

def loanides_corner_loading_stress(Pd, c, k, h, E = 4*(10**6), nu = 0.15):
    """
    P is summation of all loading
    """
    first_part = (3*Pd)/(h**2)
    l = relative_stiffness(k, h , E, nu)
    second_part = (c/l)**2
    return first_part*(1 - second_part)

def loanides_corner_loading_deflection(Pd, c, k, h, E = 4*(10**6), nu = 0.15):
    l = relative_stiffness(k, h , E, nu)

    first_part = (Pd/(k*(l**2)))

    second_part = 0.69*(c/l)

    return first_part*(1.205 - second_part)

def interior_loading_stress(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    to_check = 1.724 * a

    if(to_check >= a):
        b = a
    else:
        first_part = (1.6*(a**2)) + h**2
        second_part = 0.675 * h
        b = (first_part**0.5) - second_part
    
    first_part = (3*(1+nu)*Pd)/(2*(math.pi)*(h**2))
    l = relative_stiffness(k, h , E, nu)
    second_part = math.log(l/b)
    return first_part * (second_part + 0.6159)

# a = a_eq_dual_tires(6000, 80, 14)

# print(interior_loading_stress(2*6000, a, 200, 10))

def interior_loading_deflection(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    l = relative_stiffness(k, h , E, nu)
    first_part = Pd/(8*k*(l**2))
    second_part = 1/(2*(math.pi))
    third_part = math.log(a/(2*l))
    fourth_part = (a/l)**2
    return first_part * (1+ second_part*(third_part - 0.673)*fourth_part)


def edge_loading_stress_circle(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    first_part = (3*(1+nu)*Pd)/((math.pi)*(3+nu)*(h**2))
    second_part = math.log((E*(h**3))/(100*k*(a**4)))
    l = relative_stiffness(k, h , E, nu)
    third_part = 1.84 - (4 * nu / 3) + ((1-nu)/2) + (1.18*(1+2*nu)*a)/l
    return first_part*(second_part + third_part)

# a = a_eq_dual_tires(6000, 80, 14)

# print(edge_loading_stress_circle(2*6000, a, 200, 10))

def edge_loading_stress_semicircle(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    first_part = (3*(1+nu)*Pd)/((math.pi)*(3+nu)*(h**2))
    second_part = math.log((E*(h**3))/(100*k*(a**4)))
    l = relative_stiffness(k, h , E, nu)
    third_part = 3.84 - (4 * nu / 3) + ((1+2*nu)*a)/(2*l)
    return first_part*(second_part + third_part)


def edge_loading_deflection_circle(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    first_part = ((2+1.2*nu*Pd)/(E*(h**3)*k))**0.5
    l = relative_stiffness(k, h , E, nu)
    second_part = ((0.74+0.4*nu)*a)/l
    return first_part*(1-second_part)

def edge_loading_deflection_semicircle(Pd, a, k, h, E = 4*(10**6), nu = 0.15):
    first_part = ((2+1.2*nu*Pd)/(E*(h**3)*k))**0.5
    l = relative_stiffness(k, h , E, nu)
    second_part = ((0.323+0.17*nu)*a)/l
    return first_part*(1-second_part)

# print(curling_stress_edge(40*12,200,9,9*1.5))
# a = (9000/(100*math.pi))**0.5
# print(edge_loading_stress_circle(9000, a, 200,9))

def friction_stress(L, fa=1.5,gamma=0.0868 ):
    return (L*fa*gamma)/2

def joint_opening(C ,L , delta_t, epsilon, alpha_t = 5 * (10**-6)):
    """
    epsilon is drying shrinkage coefficient
    returns in^2/in
    """
    return C*L*(alpha_t*delta_t + epsilon)

def As_req(L, h, fs=43000, fa=1.5, gamma=0.0868):
    return (L*gamma*fa*h)/(2*fs)

# Longitude

# As_long = As_req(40*12, 9) * 12 # 12 is for changin to foot
# print(As_long)

# Transvers
# As_trans = As_req(22*12, 9) * 12
# print(As_trans)


l = relative_stiffness(300, 10)
print(l*1.8)

# ToDo - Add Dowel handler