export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men-shirtings", label: "Men Shirtings" },
      { id: "men-shootings", label: "Men Shootings" },
      { id: "men-dhotis", label: "Men Dhotis" },
      { id: "women-saree", label: "Women Saree" },
      { id: "women-blouse-bit", label: "Women Blouse Bit" },
      { id: "women-linings", label: "Women Linings" },
      { id: "women-saree-falls", label: "Women Saree Falls" },
      { id: "kids", label: "Towel" },
      { id: "accessories", label: "Bedsheets" },
      
    ],
  },

  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "sivaraj", label: "Sivaraj Spinning Mills" },
      { id: "kalyani", label: "Sri Kalyani Clothing Company" },
      { id: "venkatachalapathy", label: "Venkatachalapathy Textiles" },
      { id: "kandaa", label: "Salem Kandaa Textile Mills" },
      { id: "sankari", label: "Sankari Textiles" },
      { id: "nithya", label: "Nithya Fabrics" },
    ]

  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },

  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  

  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];


export const categoryOptionsMap = {
  "men-shirtings": "Men Shirtings",
  "men-shootings": "Men Shootings",
  "men-dhotis": "Men Dhotis",
  "women-saree": "Women Saree",
  "women-blouse-bit": "Women Blouse Bit",
  "women-linings": "Women Linings",
  "women-saree-falls": "Women Saree Falls",
  "towel": "Towel",
  "bedsheets": "Bedsheets",
};


export const brandOptionsMap = {
  sivaraj: "Sivaraj Spinning Mills",
  kalyani: "Sri Kalyani Clothing Company",
  venkatachalapathy: "Venkatachalapathy Textiles",
  kandaa: "Salem Kandaa Textile Mills",
  sankari: "Sankari Textiles",
  nithya: "Nithya Fabrics",
};


export const filterOptions = {
  category: [
    { id: "men-shirtings", label: "Men Shirtings" },
    { id: "men-shootings", label: "Men Shootings" },
    { id: "men-dhotis", label: "Men Dhotis" },
    { id: "women-saree", label: "Women Saree" },
    { id: "women-blouse-bit", label: "Women Blouse Bit" },
    { id: "women-linings", label: "Women Linings" },
    { id: "women-saree-falls", label: "Women Saree Falls" },
    { id: "towel", label: "Towel" },
    { id: "bedsheets", label: "Bedsheets" }
  ],


  brand: [
    { id: "sivaraj", label: "Sivaraj Spinning Mills" },
    { id: "kalyani", label: "Sri Kalyani Clothing Company" },
    { id: "venkatachalapathy", label: "Venkatachalapathy Textiles" },
    { id: "kandaa", label: "Salem Kandaa Textile Mills" },
    { id: "sankari", label: "Sankari Textiles" },
    { id: "nithya", label: "Nithya Fabrics" },
  ]

};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
