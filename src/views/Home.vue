<template>
    <section class="layout-Info">
        <header class="infoBar">
            <section class="Title">
                <img class="logo" :src="publicPath + 'iconos/logoShalom.jpg'" alt="logo Shalom Trendy">
                <div>
                    <h1>ShalomTrendy</h1>
                    <p :style="{fontFamily:'sans-serif', fontWeight:'bold'}">Moda Femenina Moderna</p>
                </div>
            </section>
            <section class="Bar">
                <button>Ingresar</button>
            </section>
            <div class="shopping-cart" :style="{ opacity: carShop.length > 0 ? '1' : '0.5' }">
                <button :disabled="carShop.length === 0"><img :src="publicPath + 'iconos/shopping-cart.png'" alt="carrito"></button>
                <h4>{{ carShop.length }}</h4>
            </div>
        </header>
        <article class="carrousel-Container">
            <section class="carrousel">
                <div v-for="(categoryObj, categoryIndex) in topsList" :key="categoryIndex" class="category-container"   >
                    <img class="img-product" :src="getCurrentImage(categoryObj, currentIndices[categoryIndex])" alt="" v-reveal
                     :style="{ transition: 'all 0.9s ease' }"
                     @touchstart="handleTouchStart"
                     @touchend="handleTouchEnd($event, categoryIndex, getCategoryLength(categoryObj))"
                     @click="handleImageClick(categoryIndex, getCategoryLength(categoryObj))">
                    <div class="buttons-container"> 
                        <button class="prev-button" @click="prevImage(categoryIndex)"></button>
                        <button class="next-button" @click="nextImage(categoryIndex, getCategoryLength(categoryObj))"></button>
                    </div>
                    <h3>{{ getCategoryName(categoryObj) }}</h3>
                    <div class="buttons-carshop" :style="{display: 'flex', justifyContent: 'space-between'}">
                        <button @click="addToCarShop(categoryObj, currentIndices[categoryIndex])">Agregar al Carrito</button>
                        <button @click="removeFromCarShop(categoryObj, currentIndices[categoryIndex])">Eliminar del Carrito</button>
                    </div>
                </div>
                
            </section>
            <section class="social-Web">
                <img onclick="window.open('https://www.instagram.com/shalomtrendy.ve/', '_blank')" :src="publicPath + 'iconos/instagram.png'" alt="instagram">
                <img onclick="window.open('https://www.tiktok.com/@shalomtrendy.ve', '_blank')" :src="publicPath + 'iconos/tiktok.png'" alt="tiktok">
                <img onclick="window.open('https://wa.me/584242066580?text=Hola%2C%20quiero%20consultar%20precios%20y%20disponibilidad', '_blank')" :src="publicPath + 'iconos/whatsapp.png'" alt="whatsapp">
            </section>
        </article>
    </section>
</template>

<script lang="ts">
import { ref, defineComponent, Directive } from 'vue';

const vReveal: Directive = {
    mounted(el) {
        el.classList.add('reveal-hidden');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal-show');
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1
        });
        observer.observe(el);
    }
};

type Category = {
    [key: string]: string[];
};

export default defineComponent({
    name: 'Home',
    directives: {
        reveal: vReveal
    },
    setup() {
        const cuelloAltoList = [
            "/cuello_alto/top1.jpg",
            "/cuello_alto/top2.jpg",
            "/cuello_alto/top3.jpeg"
        ];
        const charmList = [
            "/charm/top1.jpg",
        ];
        const aberturaList = [
            "/abertura/top1.jpeg",
        ];
        const clasicoList = [
            "/clasico/top1.jpeg",
            
        ];
        const franelillaList = [
            "/franelilla/top1.jpeg",
        ];
        const olimpycList = [
            "/olimpyc/top1.jpg",
            "/olimpyc/top2.jpeg",
        ];
        const girlyList = [
            "/Girly/top1.jpeg",
            
        ];
        const oneShoulderList= [
            "/one-shoulder/top1.jpeg",
        ];
        const sparkList = [
            "/spark/top1.jpeg",
        ];
        const superNovaList = [
            "/superNova/top1.jpeg",
        ];
        const moonList=[
            "/moon/top1.jpeg"
        ];
        const modelosList=[
            "/modelos/abertura-beige.jpeg",
            "/modelos/aura-red.jpeg",
            "/modelos/clasico-aqua.jpeg",
            "/modelos/cuello-alto-white.jpeg",
            "/modelos/franelilla-oranje.jpeg",
            "/modelos/girly-purple.jpeg",
            "/modelos/moon-white.jpeg",
            "/modelos/olimpyc-aqua.jpeg",
            "/modelos/one-shoulder-white.jpeg",
            "/modelos/spark-pink.jpeg",
            "/modelos/super-nova-blue.jpeg"
        ];

        const topsList: Category[] = [
            {"Cuello Alto": cuelloAltoList},
            {"Charm": charmList},
            {"Olympic": olimpycList},
            {"Abertura": aberturaList},
            {"Clásico": clasicoList},
            {"Franelilla": franelillaList},
            {"Girly": girlyList},
            {"One Shoulder": oneShoulderList},
            {"Spark": sparkList},
            {"Super Nova": superNovaList},
            {"Moon": moonList},
            {"Modelos": modelosList},
        ];

        const carShop= ref<string[]>([]);

        const addToCarShop = (categoryObj: Category, index: number) => {
            const arr = getCategoryArray(categoryObj);
            const path = arr[index];
            carShop.value.push(path);
            console.log(carShop.value);
        };

        const removeFromCarShop = (categoryObj: Category, index: number) => {
            const arr = getCategoryArray(categoryObj);
            const path = arr[index];
            const idx = carShop.value.lastIndexOf(path);
            if (idx > -1) {
                carShop.value.splice(idx, 1);
            }
            console.log(carShop.value);
        };


        // Array para guardar el índice actual de cada categoría
        const currentIndices = ref(topsList.map(() => 0));

        const publicPath = process.env.BASE_URL;

        // Función para obtener el array de imágenes de un objeto categoría
        const getCategoryArray = (categoryObj: Category): string[] => {
            const key = Object.keys(categoryObj)[0];
            return categoryObj[key];
        };

        // Función para obtener la imagen actual de una categoría
        const getCurrentImage = (categoryObj: Category, index: number): string => {
            const arr = getCategoryArray(categoryObj);
            const path = arr[index];
            return process.env.BASE_URL + (path.startsWith('/') ? path.slice(1) : path);
        };

        // Función para obtener la longitud de una categoría
        const getCategoryLength = (categoryObj: Category): number => {
            return getCategoryArray(categoryObj).length;
        };

        // Función para obtener el nombre de la categoría
        const getCategoryName = (categoryObj: Category): string => {
            return Object.keys(categoryObj)[0];
        };

        // Función para ir a la siguiente imagen
        const nextImage = (categoryIndex: number, categoryLength: number) => {
            const img = document.querySelectorAll('.img-product')[categoryIndex] as HTMLElement;
            if (img) {
                img.style.transform = 'translateX(1em)';
                img.style.opacity = '0';
                
                setTimeout(() => {
                    currentIndices.value[categoryIndex] = 
                        (currentIndices.value[categoryIndex] + 1) % categoryLength;
                    img.style.transform = 'translateX(0)';
                    img.style.opacity = '1';
                }, 300);
            }
        };

        const prevImage = (categoryIndex: number) => {
            const img = document.querySelectorAll('.img-product')[categoryIndex] as HTMLElement;
            if (img) {
                img.style.transform = 'translateX(-1em)';
                img.style.opacity = '0';
                
                setTimeout(() => {
                    const currentIndex = currentIndices.value[categoryIndex];
                    const categoryObj = topsList[categoryIndex];
                    const categoryLength = getCategoryLength(categoryObj);
                    currentIndices.value[categoryIndex] = 
                        currentIndex === 0 ? categoryLength - 1 : currentIndex - 1;
                    img.style.transform = 'translateX(0)';
                    img.style.opacity = '1';
                }, 300);
            }
        };
        
        const touchStartX = ref(0);
        const touchEndX = ref(0);
        const lastTouchTime = ref(0);

        const handleTouchStart = (event: TouchEvent) => {
            touchStartX.value = event.changedTouches[0].screenX;
            lastTouchTime.value = Date.now();
        };

        const handleTouchEnd = (event: TouchEvent, categoryIndex: number, categoryLength: number) => {
            touchEndX.value = event.changedTouches[0].screenX;
            handleGesture(categoryIndex, categoryLength);
        };

        const handleGesture = (categoryIndex: number, categoryLength: number) => {
            if (touchEndX.value < touchStartX.value - 50) {
                nextImage(categoryIndex, categoryLength);
            }
            if (touchEndX.value > touchStartX.value + 50) {
                prevImage(categoryIndex);
            }
        };

        const handleImageClick = (categoryIndex: number, categoryLength: number) => {
            const isRecentTouch = Date.now() - lastTouchTime.value < 500;
            if (!isRecentTouch || Math.abs(touchEndX.value - touchStartX.value) < 10) {
                 nextImage(categoryIndex, categoryLength);
            }
        };

        return {
            topsList,
            currentIndices,
            getCurrentImage,
            getCategoryLength,
            getCategoryName,
            nextImage,
            prevImage,
            publicPath,
            handleTouchStart,
            handleTouchEnd,
            handleImageClick,
            addToCarShop,
            removeFromCarShop,
            carShop
        }
    }
});
</script>