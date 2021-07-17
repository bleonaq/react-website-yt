import { Row, Col, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import { useCrudContext } from "../../../providers/CrudProvider";
import api from "../../../AxiosCall";
import BirthPlaceItems from "./BirthplaceItems";

function BirthplaceList(props) {
  const { user } = useAppContext();
  const { data, dispatchCrud } = useCrudContext();
  useEffect(() => {
    getItems();
  }, [props.cityId]);

  const getItems = async () => {
    await api
      .get("/Administration/getBirthplaceByCity/" + props.cityId, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        dispatchCrud({ type: "init", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="osahan-cart-item mb-3 rounded shadow-sm bg-white overflow-hidden">
        <div className="osahan-cart-item-profile bg-white p-3">
          <Table responsive="sm" className="mt-3">
            <thead>
              <tr>
                <th>Birthplace Name</th>
                <th style={{ width: "20%" }}>Modify</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <BirthPlaceItems
                    key={item.birthplaceId}
                    {...item}
                  ></BirthPlaceItems>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default BirthplaceList;
