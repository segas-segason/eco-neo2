import markerUrl from "../../assets/icons/icon-marker.svg";

export function initYaMap() {
    if (typeof ymaps === "undefined") return;

    ymaps.ready(() => {
        const mapElement = document.getElementById("map");
        if (!mapElement) return;

        const myMap = new ymaps.Map("map", {
            center: [54.926626, 20.510268],
            controls: ["geolocationControl"],
            zoom: 16,
        });

        const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(`
            <div class="p-2">
                <span class="font-brand font-bold text-xl text-grey-dark sm:text-2xl">{{properties.balloonContentHeader}}</span><br />
                <span class="font-sans text-base text-grey">
                    {{properties.balloonContentBody}}
                </span>
            </div>
        `);

        const myPlacemarkWithContent = new ymaps.Placemark(
            [54.926626, 20.510268],
            {
                hintContent: "Ивент-пространство ЭКОПОСОЛЬСТВО",
                balloonContentHeader: "ЭКОПОСОЛЬСТВО",
                balloonContentBody: "Калининградская область, пос. Сосновка (Экоплощадка «Зеленый Кот»)",
            },
            {
                iconLayout: "default#imageWithContent",
                iconImageHref: markerUrl,
                iconImageSize: [57, 78],
                iconImageOffset: [-28, -78],
                iconContentOffset: [15, 15],
                balloonContentLayout: MyIconContentLayout,
            },
        );

        myMap.controls.add("zoomControl", {
            size: "small",
            position: {
                right: "auto",
                left: 10,
                top: "auto",
                bottom: 100,
            },
        });

        myMap.controls.add("fullscreenControl", {
            float: "none",
            position: {
                right: "auto",
                left: 10,
                top: "auto",
                bottom: 50,
            },
        });

        myMap.behaviors.disable("scrollZoom");
        myMap.geoObjects.add(myPlacemarkWithContent);
    });
}
