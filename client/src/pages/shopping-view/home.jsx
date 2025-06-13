import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { 
  FaTshirt, 
  FaSocks, 
  FaChild,
  FaRegClock
} from 'react-icons/fa';
import { 
  GiArmoredPants, 
  GiLoincloth, 
  GiKimono, 
  GiPillow,
  GiTowel
} from 'react-icons/gi';
import { 
  MdOutlineBed
} from 'react-icons/md';
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Sparkles,     // For "Sivaraj" - representing quality/shine
  Crown,        // For "Sri Kalyani" - "Sri" is often used as an honorific
  Mountain,     // For "Venkatachalapathy" - named after a deity associated with hills
  Building,     // For "Salem Kandaa" - representing the Salem region 
  CircleDollarSign, // For "Sankari" - suggesting value
  Flower        // For "Nithya" - meaning eternal/divine, represented by a flower
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
const categoriesWithIcon = [
  {
    id: "men-shirtings",
    label: "Men Shirtings",
    icon: FaTshirt,
    color: "#3b82f6", // blue-500
    description: "Quality fabrics for men's shirts"
  },
  {
    id: "men-shootings",
    label: "Men Shootings",
    icon: GiArmoredPants,
    color: "#4b5563", // gray-600
    description: "Premium trouser fabrics for men"
  },
  {
    id: "men-dhotis",
    label: "Men Dhotis",
    icon: GiLoincloth,
    color: "#f59e0b", // amber-500
    description: "Traditional dhoti fabrics"
  },
  {
    id: "women-saree",
    label: "Women Saree",
    icon: GiKimono,
    color: "#ec4899", // pink-500
    description: "Elegant sarees for all occasions"
  },
  {
    id: "women-blouse-bit",
    label: "Women Blouse Bit",
    icon: FaTshirt,
    color: "#d946ef", // fuchsia-500
    description: "Beautiful blouse fabric pieces"
  },
  {
    id: "women-linings",
    label: "Women Linings",
    icon: FaSocks,
    color: "#8b5cf6", // violet-500
    description: "Quality linings for garments"
  },
  {
    id: "women-saree-falls",
    label: "Women Saree Falls",
    icon: GiLoincloth,
    color: "#db2777", // pink-600
    description: "Saree falls for perfect draping"
  },
  {
    id: "kids",
    label: "Towel",
    icon: GiTowel,
    color: "#14b8a6", // teal-500
    description: "Quality towels for daily use"
  },
  {
    id: "accessories",
    label: "Bedsheets",
    icon: MdOutlineBed,
    color: "#6366f1", // indigo-500
    description: "Comfortable bedsheets for your home"
  },
];


const brandsWithIcon = [
  { id: "sivaraj", label: "Sivaraj Spinning Mills", icon: Shirt },
  { id: "kalyani", label: "Sri Kalyani Clothing Company", icon: WashingMachine },
  { id: "venkatachalapathy", label: "Venkatachalapathy Textiles", icon: ShoppingBasket },
  { id: "kandaa", label: "Salem Kandaa Textile Mills", icon: Airplay },
  { id: "sankari", label: "Sankari Textiles", icon: Images },
  { id: "nithya", label: "Nithya Fabrics", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left Content - Justified Text */}
            <div className="w-full md:w-1/2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-indigo-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 relative">
                  About PRS Fabrics
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-indigo-500"></span>
                </h2>
                <p className="text-lg text-gray-600 text-justify leading-relaxed">
                  PRS Fabrics is a trusted name in the wholesale textile industry, offering high-quality
                  fabrics at competitive prices. With decades of experience, we specialize in sourcing
                  and supplying a wide variety of materials including cotton, silk, synthetic blends,
                  and designer prints. Our commitment to excellence and customer satisfaction makes us
                  a preferred partner for retailers, designers, and manufacturers across the region.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <path d="M3 6h18"></path>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    Shop Now
                  </button>
                  <button className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                    Download Catalog
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">Trusted by leading brands:</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span className="text-sm font-medium">Premium Quality</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm font-medium">Quality Tested</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm font-medium">24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Textile Showcase */}
            <div className="w-full md:w-1/2 relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-indigo-100 rounded-full opacity-70"></div>

              {/* Main Fabric Image - Textile Rolls */}
              <div className="bg-white p-6 rounded-2xl shadow-lg relative mb-8 transform hover:scale-105 transition duration-300">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold shadow-md">
                  PREMIUM
                </div>
                <svg
                  className="w-full h-64 mx-auto"
                  viewBox="0 0 800 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background */}
                  <rect x="0" y="0" width="800" height="500" fill="#f9f9f9" />

                  {/* Wooden shelf */}
                  <rect x="50" y="350" width="700" height="30" fill="#8B4513" />
                  <rect x="50" y="380" width="700" height="10" fill="#6B3E11" />

                  {/* Fabric Roll 1 - Cotton (Blue) */}
                  <g>
                    <ellipse cx="150" cy="350" rx="60" ry="25" fill="#3B82F6" />
                    <rect x="90" y="200" width="120" height="150" fill="#3B82F6" />
                    <ellipse cx="150" cy="200" rx="60" ry="25" fill="#60A5FA" />
                    <path d="M90,200 Q120,220 150,200 Q180,220 210,200 L210,350 Q180,370 150,350 Q120,370 90,350 Z" fill="#3B82F6" stroke="#60A5FA" strokeWidth="1" />
                    <text x="150" y="275" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Cotton</text>
                  </g>

                  {/* Fabric Roll 2 - Silk (Purple) */}
                  <g>
                    <ellipse cx="300" cy="350" rx="60" ry="25" fill="#8B5CF6" />
                    <rect x="240" y="180" width="120" height="170" fill="#8B5CF6" />
                    <ellipse cx="300" cy="180" rx="60" ry="25" fill="#A78BFA" />
                    <path d="M240,180 Q270,200 300,180 Q330,200 360,180 L360,350 Q330,370 300,350 Q270,370 240,350 Z" fill="#8B5CF6" stroke="#A78BFA" strokeWidth="1" />
                    <text x="300" y="275" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Silk</text>
                  </g>

                  {/* Fabric Roll 3 - Linen (Green) */}
                  <g>
                    <ellipse cx="450" cy="350" rx="60" ry="25" fill="#10B981" />
                    <rect x="390" y="220" width="120" height="130" fill="#10B981" />
                    <ellipse cx="450" cy="220" rx="60" ry="25" fill="#34D399" />
                    <path d="M390,220 Q420,240 450,220 Q480,240 510,220 L510,350 Q480,370 450,350 Q420,370 390,350 Z" fill="#10B981" stroke="#34D399" strokeWidth="1" />
                    <text x="450" y="275" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Linen</text>
                  </g>

                  {/* Fabric Roll 4 - Designer Print (Pink) */}
                  <g>
                    <ellipse cx="600" cy="350" rx="60" ry="25" fill="#EC4899" />
                    <rect x="540" y="160" width="120" height="190" fill="#EC4899" />
                    <ellipse cx="600" cy="160" rx="60" ry="25" fill="#F472B6" />
                    <path d="M540,160 Q570,180 600,160 Q630,180 660,160 L660,350 Q630,370 600,350 Q570,370 540,350 Z" fill="#EC4899" stroke="#F472B6" strokeWidth="1" />
                    <text x="600" y="275" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Designer</text>
                  </g>

                  {/* Pattern details on designer fabric */}
                  <circle cx="570" cy="200" r="8" fill="white" opacity="0.7" />
                  <circle cx="600" cy="230" r="10" fill="white" opacity="0.7" />
                  <circle cx="630" cy="180" r="6" fill="white" opacity="0.7" />
                  <circle cx="580" cy="250" r="7" fill="white" opacity="0.7" />
                  <circle cx="620" cy="290" r="9" fill="white" opacity="0.7" />

                  {/* Texture lines on fabrics */}
                  <g opacity="0.3">
                    <line x1="110" y1="220" x2="190" y2="220" stroke="white" strokeWidth="1" />
                    <line x1="110" y1="240" x2="190" y2="240" stroke="white" strokeWidth="1" />
                    <line x1="110" y1="260" x2="190" y2="260" stroke="white" strokeWidth="1" />
                    <line x1="110" y1="280" x2="190" y2="280" stroke="white" strokeWidth="1" />
                    <line x1="110" y1="300" x2="190" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="110" y1="320" x2="190" y2="320" stroke="white" strokeWidth="1" />

                    <line x1="260" y1="200" x2="340" y2="200" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="220" x2="340" y2="220" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="240" x2="340" y2="240" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="260" x2="340" y2="260" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="280" x2="340" y2="280" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="300" x2="340" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="260" y1="320" x2="340" y2="320" stroke="white" strokeWidth="1" />

                    <line x1="410" y1="240" x2="490" y2="240" stroke="white" strokeWidth="1" />
                    <line x1="410" y1="260" x2="490" y2="260" stroke="white" strokeWidth="1" />
                    <line x1="410" y1="280" x2="490" y2="280" stroke="white" strokeWidth="1" />
                    <line x1="410" y1="300" x2="490" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="410" y1="320" x2="490" y2="320" stroke="white" strokeWidth="1" />
                  </g>

                  {/* Shadow under shelf */}
                  <ellipse cx="400" cy="420" rx="350" ry="20" fill="#00000022" />
                </svg>
              </div>

              {/* Fabric Types Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Cotton Card */}
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A4.5 4.5 0 0 0 7 9.1"></path>
                      <path d="M12 12a4 4 0 0 0-4 4"></path>
                      <path d="M12 12a4 4 0 0 1 4 4"></path>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M10 8V5c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center text-gray-800">Cotton</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Premium Quality</p>
                </div>

                {/* Silk Card */}
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600"
                    >
                      <path d="M21.71 3.29a1 1 0 0 0-1.42 0l-9.5 9.5a1 1 0 0 0 0 1.42l5 5a1 1 0 0 0 1.42 0l9.5-9.5a1 1 0 0 0 0-1.42l-5-5Z"></path>
                      <path d="M14 12 8 6"></path>
                      <path d="M9 3 3 9"></path>
                      <path d="m12 15-3 3"></path>
                      <path d="M3 21 8 16"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center text-gray-800">Silk</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Luxurious Feel</p>
                </div>

                {/* Designer Card */}
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-600"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M3 12h3m12 0h3"></path>
                      <path d="M12 3v3m0 12v3"></path>
                      <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1"></path>
                      <path d="m18.4 5.6-2.1 2.1m-8.6 8.6-2.1 2.1"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center text-gray-800">Designer</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Unique Patterns</p>
                </div>
              </div>

              {/* Customer Reviews */}
              <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 font-medium">4.59/5 Customer Rating</p>
                </div>
                <p className="text-sm italic">"The quality of fabrics from PRS is unmatched. Excellent customer service and prompt delivery."</p>
                <p className="text-xs mt-2 font-semibold">— B.Elavarasi Senthil Kumar, Fashion Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">
            <span className="border-b-4 border-indigo-400 pb-2">Meet Our Director</span>
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Owner's Photo - Left Side */}
                <div className="w-full md:w-2/5 bg-indigo-50">
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-100 shadow-inner">
                      <img
                        src="/WhatsApp%20Image%202025-05-05%20at%2009.21.46_9cf34189.jpg"
                        alt="B.Elavarasi Senthil Kumar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information - Right Side */}
                <div className="w-full md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">B. Elavarasi Senthil Kumar</h3>
                  <p className="text-lg font-medium text-indigo-600 mb-6 inline-block px-4 py-1 bg-indigo-50 rounded-full">Fashion Designer &amp; Director</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">+91 80159 66719</p>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">prsfabrics2023@gmail.com</p>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">Salem, Tamil Nadu, India</p>
                    </div>
                  </div>

                  <p className="text-gray-600 italic border-l-4 border-indigo-300 pl-4">
                    "With over 5 years of experience in textile design, I'm passionate about creating high-quality fabrics that blend traditional craftsmanship with modern aesthetics. Feel free to reach out for collaborations or inquiries."
                  </p>

                  <div className="mt-6 flex space-x-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Contact Now
                    </button>
                    <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
