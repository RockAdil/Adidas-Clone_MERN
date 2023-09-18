import { FaHandsWash } from 'react-icons/fa';
import { BsWind } from 'react-icons/bs';
import { GiConverseShoe } from 'react-icons/gi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { LiaSocksSolid, LiaDumbbellSolid } from 'react-icons/lia';

export const Perks = ({ selected, onChange }) => {
  function handleCheckbox(ev) {
    const { name, checked } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter(perk => perk !== name)]);
    }
  }

  return (
    <div>
      <h2 className='text-base font-medium'>Perks</h2>
      <div className='grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pt-2'>
        <label className='flex gap-2 items-center border py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='Washable'
            checked={selected.includes('Washable')}
            onChange={handleCheckbox}
          />
          <FaHandsWash className='text-xl' />
          <span>Washable</span>
        </label>
        <label className='flex gap-2 items-center border  py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='Breathable feel'
            checked={selected.includes('Breathable feel')}
            onChange={handleCheckbox}
          />
          <BsWind className='text-xl' />
          <span>Breathable feel</span>
        </label>
        <label className='flex gap-2 items-center border  py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='Regular fit'
            checked={selected.includes('Regular fit')}
            onChange={handleCheckbox}
          />
          <GiConverseShoe className='text-xl' />
          <span>Regular fit</span>
        </label>
        <label className='flex gap-2 items-center border  py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='1 year Warranty'
            checked={selected.includes('1 year Warranty')}
            onChange={handleCheckbox}
          />
          <AiOutlineFileDone className='text-xl' />
          <span>1 year Warranty</span>
        </label>
        <label className='flex gap-2 items-center border  py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='Socks included'
            checked={selected.includes('Socks included')}
            onChange={handleCheckbox}
          />
          <LiaSocksSolid className='text-xl' />
          <span>Socks included</span>
        </label>
        <label className='flex gap-2 items-center border  py-3 px-4 rounded-xl cursor-pointer'>
          <input
            type='checkbox'
            name='Weightless'
            checked={selected.includes('Weightless')}
            onChange={handleCheckbox}
          />
          <LiaDumbbellSolid className='text-xl' />
          <label>Weightless</label>
        </label>
      </div>
    </div>
  );
};
