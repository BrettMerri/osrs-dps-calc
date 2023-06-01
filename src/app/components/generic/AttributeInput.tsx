import React from 'react';
import Image, {StaticImageData} from 'next/image';
import NumberInput from "@/app/components/generic/NumberInput";

interface AttributeInputProps {
  name: string;
  image: string | StaticImageData;
  value: number;
  disabled?: boolean;
  className?: string;
  onChange?: (v: number) => void;
}

const AttributeInput: React.FC<AttributeInputProps> = (props) => {
  const {name, image, className, onChange, value, disabled} = props;

  return (
    <div className={'flex items-center'}>
      <div className={'basis-10'}>
        <Image src={image} alt={name} title={name} />
      </div>
      <div className={'basis-12'}>
          {
              disabled ? (
                  <div className={'w-full font-mono text-left py-[.25em] px-[.5em] text-sm border border-zinc-400 rounded cursor-not-allowed'}>
                      {value}
                  </div>
              ) : (
                  <NumberInput
                    className={`form-control w-full rounded mt-auto ${className}`}
                    onChange={onChange}
                    value={value.toString()}
                  />
              )
          }
      </div>
    </div>
  )
}

export default AttributeInput;