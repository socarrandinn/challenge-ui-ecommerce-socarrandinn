import { Rating } from "@/components/core/rating/rating";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/interfaces/product.interface";

type Props = {
  product: IProduct;
};

// todo- solo para relleno
const ProductTabs = ({ product }: Props) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Descripción</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
        <TabsTrigger value="usage">Modo de Uso</TabsTrigger>
        <TabsTrigger value="reviews">Reseñas (127)</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Descripción del Producto</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                Nuestro Multivitamínico Premium Complex es una fórmula avanzada
                que combina vitaminas esenciales, minerales y antioxidantes para
                apoyar tu salud y bienestar general. Desarrollado con
                ingredientes de la más alta calidad y respaldado por
                investigación científica.
              </p>
              <h4 className="font-semibold mb-2">Beneficios principales:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fortalece el sistema inmunológico</li>
                <li>Aumenta los niveles de energía</li>
                <li>Mejora la salud cardiovascular</li>
                <li>Apoya la función cerebral</li>
                <li>Promueve la salud de la piel, cabello y uñas</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ingredients" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Lista de Ingredientes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Vitaminas:</h4>
                <ul className="text-sm space-y-1">
                  <li>Vitamina A - 800 mcg</li>
                  <li>Vitamina C - 90 mg</li>
                  <li>Vitamina D3 - 20 mcg</li>
                  <li>Vitamina E - 12 mg</li>
                  <li>Vitamina K - 75 mcg</li>
                  <li>Complejo B completo</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Minerales:</h4>
                <ul className="text-sm space-y-1">
                  <li>Calcio - 200 mg</li>
                  <li>Magnesio - 100 mg</li>
                  <li>Zinc - 11 mg</li>
                  <li>Hierro - 8 mg</li>
                  <li>Selenio - 55 mcg</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="usage" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Modo de Uso</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Dosis recomendada:
                </h4>
                <p className="text-blue-800">
                  Tomar 1 cápsula al día con alimentos, preferiblemente con el
                  desayuno.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Instrucciones importantes:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>No exceder la dosis recomendada</li>
                  <li>Mantener fuera del alcance de los niños</li>
                  <li>Almacenar en lugar fresco y seco</li>
                  <li>
                    Consultar con un médico antes de usar si está embarazada o
                    amamantando
                  </li>
                  <li>Discontinuar el uso si experimenta efectos adversos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Reseñas de Clientes</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      <Rating variant="preview" value={product?.rating ?? 0} />
                    </div>
                    <span className="font-medium">María González</span>
                    <span className="text-sm text-gray-500">
                      hace 2 semanas
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Excelente producto, he notado más energía desde que lo tomo.
                    La calidad es muy buena y el envío fue rápido.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
