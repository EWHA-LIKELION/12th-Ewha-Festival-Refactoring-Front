import React from "react";
import EditView from "../../components/perform/EditView";
import {useLocation} from "react-router-dom";

export default function EditViewPage() {
  const location = useLocation();
  const { id } = location.state || {};
  console.log('EditViewPage',id);

  return <EditView boothId={id}/>;
}
